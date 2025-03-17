export class CreateRestaurantDto {
    title: string;
    description?: string;
    address: string;
    phone?: string;
    picture?: string;
    createAt?: Date;
    updateAt?: Date;
    createBy?: number;
    updatedBy?: number;
    isActive?: boolean;
}
