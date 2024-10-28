import type { IncomeEntity } from "./Income.Entity.Model";
import type { OutcomeEntity } from "./Outcome.Entity.Model";

export class InboxEntity {
  id: number = 0;
  title: string = "";
  description: string | null = null;
  income: IncomeEntity[] = [];
  outcome: OutcomeEntity[] = [];
}
