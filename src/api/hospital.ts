import request from "@/utils/request";

export function getHospList() {
  return request({
    url: 'hospital/list',
    method: 'get'
  })
}

export function addHosp(data: any) {
  return request({
    url: "hospital/add",
    method: "post",
    data,
  });
}
