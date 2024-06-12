import { Model, Table, Column, DataType, Default } from 'sequelize-typescript';

@Table({
	tableName: 'products',
})
class Product extends Model {
	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	price: number;

	@Default(true)
	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	availability: boolean;
}

export default Product;
