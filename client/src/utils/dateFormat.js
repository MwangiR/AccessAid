import dayjs from 'dayjs';

function formatDate(createdAt) {
  const timestamp = Number(createdAt);
  return dayjs(timestamp).format('DD-MMM-YYYY');
}

export default formatDate;
