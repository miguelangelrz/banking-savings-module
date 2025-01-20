type SavingsAccountDetailParams = Promise<{
  id: string;
}>;

export default async function SavingsAccountDetail(params: SavingsAccountDetailParams) {
  const id = (await params).id;
  return <h1>Account #{id}</h1>;
}
