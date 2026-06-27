import { clientDto, accountDto, depositRequestDto } from '../client-module/types';

export type pageDto<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;       // current page, 0-indexed
}

export type adminLoanRequestDto = {
  loanRequestId: number;
  amount: number;
  installment: number;
  duration: string;
  interestRate: number;
}

export type loanStatusUpdateRequest = {
  loanId: string;
  changeStatus: 'approved' | 'rejected';
}

export type depositStatusUpdateRequest = {
  depositRequestId: string;
  status: 'approved' | 'rejected';
}

// Re-export shared types used in admin views
export { clientDto, accountDto, depositRequestDto };
