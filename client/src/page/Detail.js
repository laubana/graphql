import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Divider, Flex, Typography, Empty } from "antd";
import { GET_OWNER } from "../service/graphql/ownerQuery";
import OwnerCard from "../component/Card/OwnerCard";
import AddOwner from "../component/Form/AddOwner";
import AddCar from "../component/Form/AddCar";

const DetailView = () => {
  const { id } = useParams();

  const { loading, data: ownerData } = useQuery(GET_OWNER, {
    variables: { id: id },
  });

  return (
    <div>
      <Typography.Title
        style={{ textAlign: "center", textTransform: "uppercase" }}
      >
        Owner and Its Cars
      </Typography.Title>
      <Divider />
      <AddOwner />
      <AddCar />
      <Divider>Records</Divider>
      <Flex style={{ padding: "12px 0", justifyContent: "center" }}>
        {!loading && ownerData.getOwner ? (
          <OwnerCard
            id={id}
            firstName={ownerData.getOwner.firstName}
            lastName={ownerData.getOwner.lastName}
            featured
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Flex>
    </div>
  );
};

export default DetailView;
