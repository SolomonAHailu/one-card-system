"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { createLoginSchema } from "@/validators/common/login-validator";
import { FaEye, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { handleLogin } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { IoMdEyeOff } from "react-icons/io";
import { cn } from "@/lib/utils";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const t = useTranslations("login");
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [visible, setVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(createLoginSchema(t)),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    dispatch<any>(handleLogin({ data, router }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-semibold">
            {t("welcome")}
          </CardTitle>
          <p className="text-foreground">{t("logintocontinue")}</p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("email")}
              </Label>
              <Input
                id="email"
                type="text"
                placeholder={t("enteremail")}
                {...register("email")}
                className={cn(
                  { "focus-visible:ring-red-600": errors.email },
                  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                )}
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2 py-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center justify-center gap-2 relative">
                <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                  {visible ? (
                    <IoMdEyeOff
                      size={22}
                      className="cursor-pointer text-primary"
                      onClick={() => setVisible(!visible)}
                    />
                  ) : (
                    <FaEye
                      size={22}
                      className="cursor-pointer text-primary"
                      onClick={() => setVisible(!visible)}
                    />
                  )}
                </div>
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder={t("enterpassword")}
                  {...register("password")}
                  className={cn(
                    { "focus-visible:ring-red-600": errors.password },
                    "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                  )}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-150"
              disabled={isLoading}
            >
              <span>{t("login")}</span>
              {isLoading && <FaSpinner className="animate-spin ml-2" />}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
