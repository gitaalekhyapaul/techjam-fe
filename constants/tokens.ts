// Token Configuration for TikTok TechJam Wallet System
// This file defines the token economics and conversion rates

export interface TokenConfig {
  name: string;
  symbol: string;
  description: string;
  conversionRate: number; // How many tokens per USD
}

export interface WalletBalance {
  tk: number;
  tki: number;
  total: number;
}

export interface WalletResponse {
  walletType: 'user' | 'creator';
  balance: WalletBalance;
}

// Base Token Configuration
export const TK_TOKEN: TokenConfig = {
  name: 'Sparks',
  symbol: 'TK',
  description: 'Base token for transactions and payments',
  conversionRate: 1, // 1 USD = 1 TK
};

// Reward Token Configuration
export const TKI_TOKEN: TokenConfig = {
  name: 'Hypes',
  symbol: 'TKI',
  description: 'Rebate and reward token earned from transactions',
  conversionRate: 100, // 1 TK = 100 TKI
};

// Rebate Configuration
export const REBATE_RATE = 0.0004; // 0.04% rebate rate
export const REBATE_RATE_PERCENTAGE = 0.04; // For display purposes

// Token Utility Functions
export class TokenUtils {
  /**
   * Calculate TKI rebate based on TK amount
   * @param tkAmount - Amount in TK tokens
   * @returns TKI rebate amount
   */
  static calculateRebate(tkAmount: number): number {
    return Math.floor(tkAmount * REBATE_RATE * TKI_TOKEN.conversionRate);
  }

  /**
   * Convert USD to TK tokens
   * @param usdAmount - Amount in USD
   * @returns TK token amount
   */
  static usdToTk(usdAmount: number): number {
    return usdAmount * TK_TOKEN.conversionRate;
  }

  /**
   * Convert TK to TKI tokens
   * @param tkAmount - Amount in TK tokens
   * @returns TKI token amount
   */
  static tkToTki(tkAmount: number): number {
    return tkAmount * TKI_TOKEN.conversionRate;
  }

  /**
   * Calculate total wallet balance
   * @param tk - TK balance
   * @param tki - TKI balance
   * @returns Total balance (TK + TKI)
   */
  static calculateTotalBalance(tk: number, tki: number): number {
    return tk + tki;
  }

  /**
   * Create wallet balance object
   * @param tk - TK balance
   * @param tki - TKI balance
   * @returns WalletBalance object
   */
  static createBalance(tk: number, tki: number): WalletBalance {
    return {
      tk,
      tki,
      total: this.calculateTotalBalance(tk, tki)
    };
  }

  /**
   * Validate transaction amount
   * @param amount - Amount to validate
   * @param availableBalance - Available balance to check against
   * @returns Validation result
   */
  static validateTransaction(amount: number, availableBalance: number): {
    isValid: boolean;
    error?: string;
  } {
    if (amount <= 0) {
      return { isValid: false, error: 'Amount must be greater than 0' };
    }
    
    if (amount > availableBalance) {
      return { isValid: false, error: 'Insufficient balance' };
    }
    
    if (!Number.isFinite(amount)) {
      return { isValid: false, error: 'Invalid amount' };
    }
    
    return { isValid: true };
  }
}

// Payment Method Configuration
export const PAYMENT_METHODS = {
  CREDIT_DEBIT: 'credit_debit',
  PAYPAL: 'paypal',
  GOOGLE_PAY: 'google_pay',
  APPLE_PAY: 'apple_pay'
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

// Default Wallet Balances
export const DEFAULT_USER_BALANCE: WalletBalance = {
  tk: 0,
  tki: 0,
  total: 0
};

export const DEFAULT_CREATOR_BALANCE: WalletBalance = {
  tk: 0,
  tki: 0,
  total: 0
};

// Token Display Configuration
export const TOKEN_DISPLAY = {
  TK: {
    name: TK_TOKEN.name,
    symbol: TK_TOKEN.symbol,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  TKI: {
    name: TKI_TOKEN.name,
    symbol: TKI_TOKEN.symbol,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
} as const;