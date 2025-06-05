import {CanActivate, ExecutionContext, Injectable, NotFoundException} from "@nestjs/common";
import {Observable} from "rxjs";
import {TransactionService} from "../transaction/transaction/transaction.service";
import {CategoryService} from "../category/category.service";

@Injectable()
export class AuthorGuard implements CanActivate{
    constructor(
        private readonly transactionService: TransactionService,
        private readonly categoryService: CategoryService
    ) {}

    async canActivate(contex: ExecutionContext):Promise<boolean> {
        const request = contex.switchToHttp().getRequest()
        const  {id, type} = request.params
        let entity
        switch (type){
            case 'transaction':
                entity = await this.transactionService.findOne(id)
                break
            case  'category':
                entity = await this.categoryService.findOne(id)
                break
            default:
                throw new  NotFoundException('Something went wrong')
        }
        const  user = request.user
        return !!(entity && user && entity.user.id === user.id);

    }
}