export function transformDateText(dateStr: string): string {
    const date = new Date(dateStr)

    return `${date.getFullYear()}-${`0${date.getMonth()+1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`
} 