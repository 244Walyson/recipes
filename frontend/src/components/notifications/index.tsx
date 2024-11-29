import React from "react";
import Card from "../search/searchcard";

const NotificationsPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl">Notificações</h1>
      </div>

      <div className="flex w-full pt-20 justify-center">
        <div className="w-1/2">
          <div className="grid grid-flow-row gap-4">
            <Card
              text={"Lorem ipsum d"}
              socialMedia={"instagram"}
              imgUrl={"https://github.com/shadcn.png"}
              polarity={"neutral"}
            />
            <Card
              text={"Lorem ipsum d"}
              socialMedia={"instagram"}
              imgUrl={"https://github.com/shadcn.png"}
              polarity={"neutral"}
            />
            <Card
              text={"Lorem ipsum d"}
              socialMedia={"instagram"}
              imgUrl={"https://github.com/shadcn.png"}
              polarity={"neutral"}
            />
            <Card
              text={"Lorem ipsum d"}
              socialMedia={"instagram"}
              imgUrl={"https://github.com/shadcn.png"}
              polarity={"neutral"}
            />
            <Card
              text={"Lorem ipsum d"}
              socialMedia={"instagram"}
              imgUrl={"https://github.com/shadcn.png"}
              polarity={"neutral"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
