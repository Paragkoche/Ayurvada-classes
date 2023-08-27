import moment from "moment";
export function calculateExpiredDate(timeParameter) {
  const match = timeParameter.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error("Invalid time parameter format");
  }

  const amount = parseInt(match[1]);
  const unit = match[2];

  const currentDate = moment();
  const futureDate = currentDate.clone().add(amount, unit);

  return futureDate.toDate();
}
