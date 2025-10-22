"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reqAdminCreate } from "@/requests/req-admin/req-admin";
import { toast } from "sonner";
import { TAdminInsert } from "aiqna_common_v1";

/**
 * Admin 회원가입 페이지
 * @returns Admin 회원가입 페이지
 */
export default function SignupForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget) as unknown as TAdminInsert;
    const result = await reqAdminCreate(formData);

    if (result.success && result.dbResponse?.data && result.dbResponse?.data?.length > 0) {
      redirect("/");
    } else if (result.success && result.dbResponse?.data && result.dbResponse?.data?.length === 0) {
      toast.error("No data inserted! Please check the data.");
    } else {
      toast.error(result.alarm || result.msg || "Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select name="level" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Manager</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                  <SelectItem value="3">Developer</SelectItem>
                  <SelectItem value="4">Super</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
