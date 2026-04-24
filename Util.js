function sortSubscriptions(list, sortvalue){
  return [...list].sort((a, b) => {
    const aDue = new Date(a.renewal).getTime();
    const bDue = new Date(b.renewal).getTime();

    switch (sortvalue) {
      case "soonest": return aDue - bDue;
      case "latest":  return bDue - aDue;
      case "hi":      return Number(b.price) - Number(a.price);
      case "lo":      return Number(a.price) - Number(b.price);
      case "az":      return a.name.localeCompare(b.name);
      case "za":      return b.name.localeCompare(a.name);
    }
    return 0;
  });
}

module.exports = {sortSubscriptions};
