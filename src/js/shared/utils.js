/**
 * Created by acezou on 15/7/21.
 */
import diff from 'deep-diff'

export default {
  checkDiff(obj1, obj2) {
    return diff(obj1, obj2)
  },
  equal(obj1, obj2) {
    return !diff(obj1, obj2)
  },
}
