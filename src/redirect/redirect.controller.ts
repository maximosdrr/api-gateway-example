import {
  Controller,
  Param,
  Request,
  All,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { PermissionAuthGuard } from 'src/guards/permission.guard';
import { MicroserviceClientService } from 'src/services/microservice-client.service';

@Controller('')
export class RedirectController {
  constructor(
    private readonly microserviceClientService: MicroserviceClientService,
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(PermissionAuthGuard)
  @All(':host/:resource/:path?')
  async redirect(
    @Request() req: any,
    @Param('host') host: string,
    @Param('resource') resource: string,
    @Param('path') path: string,
  ) {
    const client = this.microserviceClientService.pickClientByHost(host);
    const url = `${client.host}/${resource}/${path ?? ''}`;

    return await firstValueFrom(
      this.httpService
        .request({
          url,
          headers: req.headers,
          method: req.method,
          data: req.body,
          params: req.query,
        })
        .pipe(
          map((response) => response.data),
          catchError((e) => {
            const axiosError = e as AxiosError;

            if (axiosError.response) {
              throw new HttpException(
                axiosError.response.data || 'Unknown Error',
                axiosError.response.status || 500,
              );
            }

            throw new HttpException(
              axiosError?.response?.data ??
                axiosError.message ??
                'Unknown Error',
              axiosError?.response?.status ?? 500,
            );
          }),
        ),
    );
  }
}
