import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { signInFormControls, signUpFormControls } from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function AuthPage() {
  const [searchParams] = useSearchParams();
  const { handleLoginUser, handleRegisterUser, signInFormData, setSignInFormData, signUpFormData, setSignUpFormData } = useContext(AuthContext);

  function renderFormControl(control) {
    const { componentType, type, name, placeholder, label, options } = control;

    switch (componentType) {
      case "input":
        return (
          <div className="grid gap-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              value={searchParams.get("tab") === "signin" ? signInFormData[name] : signUpFormData[name]}
              onChange={(e) => {
                if (searchParams.get("tab") === "signin") {
                  const newData = {
                    ...signInFormData,
                    [name]: e.target.value,
                  };
                  console.log('Updating signin form:', newData);
                  setSignInFormData(newData);
                } else {
                  const newData = {
                    ...signUpFormData,
                    [name]: e.target.value,
                  };
                  console.log('Updating signup form:', newData);
                  setSignUpFormData(newData);
                }
              }}
            />
          </div>
        );
      case "select":
        return (
          <div className="grid gap-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Select
              value={signUpFormData[name]}
              onValueChange={(value) => {
                const newData = {
                  ...signUpFormData,
                  [name]: value,
                };
                console.log('Updating signup form role:', newData);
                setSignUpFormData(newData);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab) {
      searchParams.set("tab", "signin");
    }
  }, [searchParams]);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Dashboarder
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Dashboarder has transformed how we deliver our courses. The ease of use and powerful features have made it an invaluable tool for both instructors and students.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Tabs defaultValue={searchParams.get("tab") || "signin"}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {signInFormControls.map((controlItem) => renderFormControl(controlItem))}
                  <Button className="w-full" onClick={handleLoginUser}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {signUpFormControls.map((controlItem) => renderFormControl(controlItem))}
                  <Button className="w-full" onClick={handleRegisterUser}>
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
