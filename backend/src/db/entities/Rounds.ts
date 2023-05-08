import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { User } from "./User.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Round extends BaseEntity{

	// The person playing round
	@ManyToOne(()=> User)
	player!: Rel<User>;
	
	@Property()
	course: string;

    @Property()
	scorecard: number[][]; 
}