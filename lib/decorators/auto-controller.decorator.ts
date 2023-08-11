import { Controller, ControllerOptions } from '@nestjs/common';
import { AUTO_CONTROLLER_WATERMARK } from '../interfaces';

interface AutoControllerDecorator {
  (prefix: string): ClassDecorator;
  (prefixOrOptions: string[] | ControllerOptions): ClassDecorator;
}

export const AutoController: AutoControllerDecorator = function AutoController(
  prefixOrOptions: string | string[] | ControllerOptions,
): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(AUTO_CONTROLLER_WATERMARK, true, target);

    /**
     * Unlike `@Injectable()`, in Nest,
     * the presence of the `@Controller()` decorator is essential
     * for defining request-handling controller classes.
     */
    const decorator = typeof prefixOrOptions === 'string'
      ? Controller(prefixOrOptions)
      : Controller(prefixOrOptions as ControllerOptions);
    decorator(target as new (...args: any[]) => any);
  };
};
