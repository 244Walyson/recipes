"use client";

import React from "react";
import Image from "next/image";
import mixer from "@/assets/mixer.svg";

const OauthRedirect = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const code = searchParams.get("code");

  //       if (!code) {
  //         setError("Authorization code is missing.");
  //         setLoading(false);
  //         return;
  //       }

  //       const accessToken = await getAccessToken(code);

  //       setToken(accessToken);
  //       console.log(accessToken);
  //       console.log("Token:", token);
  //     } catch (error: any) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchToken();
  // }, [searchParams, router]);

  return (
    <div className="dark w-full bg-background">
      <div className="flex flex-col items-center h-screen">
        <div className="items-center justify-center w-ful h-40">
          <div className="items-center">
            <Image
              src={mixer}
              alt="Logo"
              width={150}
              height={150}
              className="rotate-45 ml-8"
            />
            <h2 className="text-foreground">
              Você está sendo redirecionado...
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OauthRedirect;
