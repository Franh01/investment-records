import { Button, CircularProgress } from "@mui/material"

interface ISimpleButtonProps {
  text: string
  onClick?: () => void
  loading?: boolean
}
const SimpleButton = ({
  text = "Simple Button",
  onClick,
  loading = false,
}: ISimpleButtonProps) => {
  //TODO: Add colors to variables
  return (
    <Button
      disabled={loading}
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{
        height: "26px",
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
