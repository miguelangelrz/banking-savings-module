import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Account } from './schemas/account.schema';

describe('AccountsService', () => {
  let service: AccountsService;
  let repository: jest.Mocked<AccountsRepository>;

  const mockAccountData = {
    _id: '64ae0cfe8b9f7f0c21d3f4e9',
    accountNumber: '43243243243',
    accountType: 'savings',
    alias: 'RCP',
    balance: 0,
    currency: 'COP',
    deletedAt: null,
    holderId: '12345',
    isDeleted: false,
    status: 'active',
  };

  const mockRepository = {
    createAccount: jest.fn(),
    findUserAccountById: jest.fn(),
    findUserAccounts: jest.fn(),
    deleteUserAccount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountsRepository,
          useValue: mockRepository, // Mock del repositorio
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repository = module.get<AccountsRepository>(
      AccountsRepository,
    ) as jest.Mocked<AccountsRepository>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create a new account with a generated account number', async () => {
      const createAccountDto: CreateAccountDto = {
        alias: 'RCP',
        accountType: 'savings',
        currency: 'COP',
      };

      const mockGeneratedAccountNumber = '1234567890';
      jest
        .spyOn(service, 'generateAccountNumber')
        .mockReturnValue(mockGeneratedAccountNumber);
      repository.createAccount.mockResolvedValue(mockAccountData as any);

      const result = await service.createAccount('12345', createAccountDto);

      expect(service.generateAccountNumber).toHaveBeenCalled();
      expect(repository.createAccount).toHaveBeenCalledWith({
        ...createAccountDto,
        holderId: '12345',
        accountNumber: mockGeneratedAccountNumber,
      });
      expect(result).toEqual(mockAccountData);
    });
  });

  describe('getUserAccountById', () => {
    it('should return an account if it exists', async () => {
      repository.findUserAccountById.mockResolvedValue(mockAccountData as any);

      const result = await service.getUserAccountById(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );

      expect(repository.findUserAccountById).toHaveBeenCalledWith(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );
      expect(result).toEqual(mockAccountData);
    });

    it('should throw NotFoundException if the account does not exist', async () => {
      repository.findUserAccountById.mockResolvedValue(null);

      await expect(
        service.getUserAccountById('12345', 'nonexistent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserAccounts', () => {
    it('should return all accounts for a user', async () => {
      repository.findUserAccounts.mockResolvedValue([mockAccountData] as any);

      const result = await service.getUserAccounts('12345');

      expect(repository.findUserAccounts).toHaveBeenCalledWith('12345');
      expect(result).toEqual([mockAccountData]);
    });

    it('should throw BadRequestException on repository error', async () => {
      repository.findUserAccounts.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.getUserAccounts('12345')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('deleteUserAccount', () => {
    it('should delete an account if it exists', async () => {
      repository.findUserAccountById.mockResolvedValue(mockAccountData as any);
      repository.deleteUserAccount.mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
      } as any);

      const result = await service.deleteUserAccount(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );

      expect(repository.findUserAccountById).toHaveBeenCalledWith(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );
      expect(repository.deleteUserAccount).toHaveBeenCalledWith(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );
      expect(result).toEqual({ acknowledged: true, modifiedCount: 1 });
    });

    it('should throw NotFoundException if the account does not exist', async () => {
      repository.findUserAccountById.mockResolvedValue(null);

      await expect(
        service.deleteUserAccount('12345', 'nonexistent-id'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException on repository error', async () => {
      repository.findUserAccountById.mockResolvedValue(mockAccountData as any);
      repository.deleteUserAccount.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(
        service.deleteUserAccount('12345', '64ae0cfe8b9f7f0c21d3f4e9'),
      ).rejects.toThrow(Error);
    });
  });

  describe('generateAccountNumber', () => {
    it('should generate a 10-digit random account number', () => {
      const accountNumber = service['generateAccountNumber'](); // Acceso al método privado
      expect(accountNumber).toHaveLength(10);
      expect(Number(accountNumber)).not.toBeNaN(); // Verifica que sea un número
    });
  });
});
