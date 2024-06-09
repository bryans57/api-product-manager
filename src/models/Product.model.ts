import { Model, Table, Column, DataType } from 'sequelize-typescript';

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
		type: DataType.FLOAT(10, 2),
		allowNull: false,
	})
	price: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	availability: boolean;
}

export default Product;
