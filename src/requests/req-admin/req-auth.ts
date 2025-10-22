import { apiUrlAdminAuth } from "@/server-api/server-api-url/api-admin-admin";
import { ResponseAiqnaAPI } from "aiqna_common_v1";
import { getFormValueOrNull } from "@/utils/get-form-value";

/**
 * Admin 로그인
 * @param formData
 * @returns APIResponse<null>
 */
export async function reqAdminAuthLogin(formData: FormData): Promise<ResponseAiqnaAPI<null>> {
  const email = getFormValueOrNull("email", formData);
  const password = getFormValueOrNull("password", formData);

  if (!email) {
    return { success: false, alarm: "Email is required" };
  }

  if (!password) {
    return { success: false, alarm: "Password is required" };
  }

  const res = await fetch(apiUrlAdminAuth("login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  // 디버깅: 응답 헤더 확인
  console.log("🔍 Login request api url:", apiUrlAdminAuth("login"));
  console.log('🔍 Response status:', res.status);
  console.log('🔍 Response headers:', res.headers);
  console.log('🔍 Set-Cookie header:', res.headers.get('set-cookie'));
  
  const result = await res.json();
  
  // 디버깅: 현재 쿠키 상태 확인
  console.log('🍪 Current cookies:', document.cookie);
  
  return result;
}

/**
 * Admin 로그아웃
 * @returns APIResponse<null>
 */
export async function reqAdminAuthLogout(): Promise<ResponseAiqnaAPI<null>> {
  const res = await fetch(apiUrlAdminAuth("logout"), {
    method: "POST",
    credentials: "include",
  });

  return await res.json();
}
