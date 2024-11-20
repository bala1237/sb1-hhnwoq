export interface TestUser {
  id: string;
  username: string;
  password: string;
  displayName: string;
  type: 'retail' | 'premium' | 'business';
  accounts: {
    checking?: boolean;
    savings?: boolean;
    credit?: boolean;
    investment?: boolean;
    businessChecking?: boolean;
    businessSavings?: boolean;
    businessCredit?: boolean;
  };
}

export const TEST_USERS: TestUser[] = [
  {
    id: "user_retail",
    username: "retail.user@example.com",
    password: "Test123!",
    displayName: "Retail Customer",
    type: "retail",
    accounts: {
      checking: true,
      savings: true,
      credit: true
    }
  },
  {
    id: "user_premium",
    username: "premium.user@example.com",
    password: "Test123!",
    displayName: "Premium Customer",
    type: "premium",
    accounts: {
      checking: true,
      savings: true,
      credit: true,
      investment: true
    }
  },
  {
    id: "user_business",
    username: "business.user@example.com",
    password: "Test123!",
    displayName: "Business Customer",
    type: "business",
    accounts: {
      businessChecking: true,
      businessSavings: true,
      businessCredit: true
    }
  }
];