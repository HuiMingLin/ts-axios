const cookie = {
  read(name: string): string | null {
    const regexp =new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    const match = document.cookie.match(regexp)
    return match? decodeURIComponent(match[3]) : null
  }
}

export default cookie
