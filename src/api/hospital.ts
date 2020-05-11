import request from "@/utils/request";

export const defaultAddHospitalData = {
  hosCode: "",
  hosName: "",
  level: "",
  province: {
    select: "",
    options: [],
  },
  city: {
    select: "",
    options: [],
  },
  address: "",
};

export function getHospList(params?: any) {
  return request({
    url: "hospital/list",
    method: "get",
    params,
  });
}

export function addHosp(data: any) {
  return request({
    url: "hospital/add",
    method: "post",
    data,
  });
}

export function delHops(data: any) {
  return request({
    url: "hospital/del",
    method: "post",
    data,
  });
}

export function hospDetail(params: any) {
  return request({
    url: "hospital/detail",
    method: "get",
    params,
  });
}

export function editHops(data: any) {
  return request({
    url: "hospital/edit",
    method: "post",
    data,
  });
}
