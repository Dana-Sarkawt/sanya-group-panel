export class Overhaul {
	deposits: OverhaulAttributes = new OverhaulAttributes();
	financials: OverhaulAttributes = new OverhaulAttributes();
}

class OverhaulAttributes {
	overall_total_price: number = 0;
	overall_count: number = 0;
}
