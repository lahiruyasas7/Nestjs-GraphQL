import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { EntityMetadataNotFoundError, EntityNotFoundError } from 'typeorm';

@Catch(EntityMetadataNotFoundError)
export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return new NotFoundException('Entity not found'); 
  }
}
