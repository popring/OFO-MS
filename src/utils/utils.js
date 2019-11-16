export default {
  pagination(data, callback = () => { }) {
    return {
      onChange: (current, pageSize) => {
        callback(current,pageSize);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共 ${data.result.total_count} 条数据`
      }
    }
  }
}