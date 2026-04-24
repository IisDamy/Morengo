    export const watTime = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Set to false for 24-hour format
    });

    export const buildOrderString = (selectedItem:any, selectedModifiers:any) => {
      if (!selectedItem) return ''
      const base = selectedItem.name
      if (selectedModifiers.length === 0) return base
      const modifierParts = selectedModifiers.map((m) => `${m.qty} ${m.name}`)
      return `${base} + ${modifierParts.join(' + ')}`
    }

    export const formatNaira = (amount:number) => {
  return '₦' + Number(amount).toLocaleString('en-NG');
}