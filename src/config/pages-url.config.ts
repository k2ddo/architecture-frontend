class DASHBOARD {
  private root = '/i'

  HOME = this.root
  AUTHENTICATION = '/auth'
  WAITING = '/waiting'
  VERONIKA = `${this.root}/veronika`
  CHECK_LISTS = `${this.root}/check-lists`
  CHECK_LIST = `${this.root}/check-lists/%id%`
  TASKS = `${this.root}/tasks`
  PROFILE = `${this.root}/profile`
}

const DASHBOARD_PAGES = new DASHBOARD()
export default DASHBOARD_PAGES
