import { DashboardSection } from "../../components/dashboard/DashboardSection";

type MessageDetailPageProps = {
  name: string;
};

const MessageDetail = ({ name }: MessageDetailPageProps) => {
  return (
    <DashboardSection
      title={name}
      subtitle={`Conversation with ${name}.`}
    />
  );
};

export const SavannahNguyenPage = () => (
  <MessageDetail name="Savannah Nguyen" />
);

export const JennyWilsonPage = () => <MessageDetail name="Jenny Wilson" />;

export const GuyHawkinsPage = () => <MessageDetail name="Guy Hawkins" />;

