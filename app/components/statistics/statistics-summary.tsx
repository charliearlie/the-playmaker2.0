import { Card, CardContent, CardHeader } from "../common/card";
import CardSubHeader from "../common/card/card-subheader";
import { getTotalNumberOfPosts } from "@/services/posts-service";
import {
  getMostRecentUser,
  getTotalNumberOfUsers,
  getUserRoles,
} from "@/services/users-service";
import PlaymakerLink from "../common/link";

const getStatData = async () => {
  const [numberOfPosts, numberOfUsers, mostRecentUser] = await Promise.all([
    getTotalNumberOfPosts(),
    getTotalNumberOfUsers(),
    getMostRecentUser(),
  ]);

  return {
    numberOfPosts,
    numberOfUsers,
    mostRecentUser,
  };
};

export default async function StatisticsSummary() {
  const { numberOfPosts, numberOfUsers, mostRecentUser } = await getStatData();
  const roles = getUserRoles();
  return (
    <Card>
      <CardHeader canMinimise>Site summary</CardHeader>
      <CardSubHeader>
        <h3>Who is online</h3>
      </CardSubHeader>
      <CardContent>
        <p>Here we will display the users with active sessions</p>
        <p className="flex gap-1">
          <span>Legend:</span>[
          {roles.map((role) => (
            <span className={`font-semibold ${role.colour}`}>{role.label}</span>
          ))}
          ]
        </p>
      </CardContent>
      <CardSubHeader>
        <h3>Statistics</h3>
      </CardSubHeader>
      <CardContent>
        <p>Our users have posted a total of {numberOfPosts} messages</p>
        <p>We have {numberOfUsers} registered users</p>
        <p>
          The newest registered user is{" "}
          <PlaymakerLink href={`/user/${mostRecentUser?.username}`}>
            {mostRecentUser?.username}
          </PlaymakerLink>
        </p>
      </CardContent>
    </Card>
  );
}
