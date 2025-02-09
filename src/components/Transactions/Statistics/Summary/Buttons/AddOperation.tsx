import SimpleButton from "@components/common/SimpleButton/SimpleButton"
import { TransactionForm } from "@components/Transactions/TransactionForm/TransactionForm"
import { useState } from "react"
import useViewportSize from "@hooks/useViewportSize"

const AddOperation = () => {
  const [isCreating, setIsCreating] = useState(false)
  const { isMobile } = useViewportSize()
  return (
    <>
      <SimpleButton
        onClick={() => setIsCreating(true)}
        text="Operar"
        width={isMobile ? "auto" : "full"}
      />
      <TransactionForm isCreating={isCreating} setIsCreating={setIsCreating} />
    </>
  )
}

export default AddOperation
