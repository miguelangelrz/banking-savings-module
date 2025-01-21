import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AccountsRepository } from './accounts.repository';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';

describe('AccountsRepository', () => {
  let repository: AccountsRepository;
  let accountModel: any;

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
    satus: 'active',
  };

  const mockAccountModel = jest.fn(() => ({
    save: jest.fn().mockResolvedValue(mockAccountData),
  })) as unknown as jest.Mocked<Model<Account>>;

  mockAccountModel.findOne = jest.fn();
  mockAccountModel.find = jest.fn();
  mockAccountModel.updateOne = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsRepository,
        {
          provide: getModelToken(Account.name),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    repository = module.get<AccountsRepository>(AccountsRepository);
    accountModel = module.get(getModelToken(Account.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create a new account and return it', async () => {
      const account = await repository.createAccount(mockAccountData);

      expect(accountModel).toHaveBeenCalled();
      expect(account).toEqual(mockAccountData);
    });

    it('should create a new account with default values', async () => {
      const partialAccount = await repository.createAccount({
        alias: 'RCP',
        accountType: 'savings',
        currency: 'COP',
        holderId: '12345',
        accountNumber: '43243243243',
      });
      const account = await repository.createAccount(partialAccount);

      expect(accountModel).toHaveBeenCalled();
      expect(account).toEqual(mockAccountData);
    });
  });

  describe('findUserAccountById', () => {
    it('should return the account for the given user and id', async () => {
      mockAccountModel.findOne.mockResolvedValue(mockAccountData);

      const account = await repository.findUserAccountById(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );

      expect(accountModel.findOne).toHaveBeenCalledWith({
        _id: '64ae0cfe8b9f7f0c21d3f4e9',
        holderId: '12345',
        isDeleted: false,
      });
      expect(account).toEqual(mockAccountData);
    });

    it('should return null if no account is found', async () => {
      mockAccountModel.findOne.mockResolvedValue(null);

      const account = await repository.findUserAccountById(
        '12345',
        'nonexistent-id',
      );

      expect(accountModel.findOne).toHaveBeenCalledWith({
        _id: 'nonexistent-id',
        holderId: '12345',
        isDeleted: false,
      });
      expect(account).toBeNull();
    });
  });

  describe('findUserAccounts', () => {
    it('should return all accounts for a given user', async () => {
      mockAccountModel.find.mockResolvedValue([mockAccountData]);

      const accounts = await repository.findUserAccounts('12345');

      expect(accountModel.find).toHaveBeenCalledWith({
        holderId: '12345',
        isDeleted: false,
      });
      expect(accounts).toEqual([mockAccountData]);
    });

    it('should return an empty array if the user has no accounts', async () => {
      mockAccountModel.find.mockResolvedValue([]);

      const accounts = await repository.findUserAccounts('12345');

      expect(accountModel.find).toHaveBeenCalledWith({
        holderId: '12345',
        isDeleted: false,
      });
      expect(accounts).toEqual([]);
    });
  });

  describe('deleteUserAccount', () => {
    it('should mark the account as deleted and set deletedAt', async () => {
      const updateResult = { acknowledged: true, modifiedCount: 1 };
      mockAccountModel.updateOne.mockResolvedValue(updateResult as any);

      const result = await repository.deleteUserAccount(
        '12345',
        '64ae0cfe8b9f7f0c21d3f4e9',
      );

      expect(accountModel.updateOne).toHaveBeenCalledWith(
        { _id: '64ae0cfe8b9f7f0c21d3f4e9', holderId: '12345' },
        {
          isDeleted: true,
          deletedAt: expect.any(Date),
        },
      );
      expect(result).toEqual(updateResult);
    });

    it('should return null if the account does not exist or cannot be updated', async () => {
      mockAccountModel.updateOne.mockResolvedValue(null);

      const result = await repository.deleteUserAccount(
        '12345',
        'nonexistent-id',
      );

      expect(accountModel.updateOne).toHaveBeenCalledWith(
        { _id: 'nonexistent-id', holderId: '12345' },
        {
          isDeleted: true,
          deletedAt: expect.any(Date),
        },
      );
      expect(result).toBeNull();
    });
  });
});
