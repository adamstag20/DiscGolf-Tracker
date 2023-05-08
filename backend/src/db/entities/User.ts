import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Round } from "./Rounds.js";

@Entity({ tableName: "users"})
export class User extends BaseEntity {	
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;


	// Rounds
	@OneToMany(
		() => Round,
		match => match.player,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	games!: Collection<Round>;
	
}
