import request from "@/utils/request";
import { IArticalData } from "./types";

export const defaultAddHospitalData = {
  hosCode: "",
  hosName: "",
  level: "",
  province: "",
  city: "",
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
