/**
 * Created by acezou on 15/9/2.
 */
import { Route as R, RouteUtils } from 'react-router'

export default class Route extends R {
  static createRouteFromReactElement(element) {
    const route = super.createRouteFromReactElement(element)
    if(route && route.component && route.component.onEnter) {
      const _onEnter = route.onEnter
      route.onEnter = async () => {
        console.log('okok===============')
        await route.component.onEnter()
        if(_onEnter) await _onEnter.call(route.component)
      }
    }
    return route
  }
}