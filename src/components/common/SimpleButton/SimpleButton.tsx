import { Button, CircularProgress } from "@mui/material"

interface ISimpleButtonProps {
  text: string
  onClick?: () => void
  loading?: boolean
  type?: "button" | "submit"
  size?: "small" | "medium" | "large"
  width?: "auto" | "full"
}
const SimpleButton = ({
  text = "Simple Button",
  onClick,
  loading = false,
  type = "button",
  size = "small",
  width = "auto",
}: ISimpleButtonProps) => {
  //TODO: Add colors to variables
  return (
    <Button
      type={type}
      disabled={loading}
      variant="outlined"
      size={size}
      onClick={onClick}
      sx={{
        height: size === "small" ? "26px" : "auto",
        width: width === "auto" ? "auto" : "100%",
        minWidth: "120px",
        textTransform: "none",
        borderColor: "#114B5F20",
        color: "#114B5F",
        "&:hover": {
          borderColor: "#114B5F",
          color: "#114B5F",
        },
        fontWeight: "400",
      }}
    >
      {loading ? (
        <CircularProgress
          sx={{
            color: "#114B5F",
          }}
          size={15}
        />
      ) : (
        text
      )}
    </Button>
  )
}

export default SimpleButton
