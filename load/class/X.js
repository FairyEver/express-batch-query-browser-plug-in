import domStr from './dom'
export default class X {
    constructor () {
        $('body').append($(domStr))
    }
}