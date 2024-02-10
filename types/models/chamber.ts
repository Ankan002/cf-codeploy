export interface Chamber {
	id: string;
	name: string;
	whitelisted_emails: Array<string>;
	status: "active" | "inactive";
	endedAt: Date;
	createdAt: Date | string;
	updatedAt: Date | string;
	__v: number;
}
