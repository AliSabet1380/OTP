interface EmailTemplateProps {
  activationCode: number | null;
  username: string;
}

export const EmailTemplate = ({
  activationCode,
  username,
}: EmailTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        backgroundColor: "#f4f4f7",
        width: "100%",
      }}
    >
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#4CAF50",
                padding: "20px 10px",
                color: "#ffffff",
                textAlign: "center",
                fontSize: "24px",
              }}
            >
              Welcome to Our Platform!
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                padding: "20px",
                color: "#333333",
                lineHeight: "1.6",
                fontSize: "16px",
              }}
            >
              <p style={{ margin: "0 0 10px" }}>Hi there {username},</p>
              <p style={{ margin: "0 0 20px" }}>
                Thank you for signing up! To activate your account, please use
                the following activation code:
              </p>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#4CAF50",
                  border: "1px dashed #4CAF50",
                  padding: "15px",
                  borderRadius: "5px",
                  margin: "0 auto 20px",
                  width: "fit-content",
                }}
              >
                {activationCode}
              </div>
              <p style={{ margin: "0 0 10px" }}>
                If you have any questions, feel free to contact our support
                team.
              </p>
              <p style={{ margin: "0" }}>Best regards,</p>
              <p style={{ margin: "0", fontWeight: "bold" }}>The Team</p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f4f4f7",
                color: "#555555",
                fontSize: "12px",
              }}
            >
              &copy; {new Date().getFullYear()} Our Company. All rights
              reserved.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
