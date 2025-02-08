import SimpleButton from "@components/common/SimpleButton/SimpleButton"
import { TransactionForm } from "@components/Transactions/TransactionForm/TransactionForm"
import { useState } from "react"

const AddOperation = () => {
  const [isCreating, setIsCreating] = useState(false)
  return (
    <>
      <SimpleButton
        onClick={() => setIsCreating(true)}
        text="Añadir operación"
      />
      <TransactionForm isCreating={isCreating} setIsCreating={setIsCreating} />
    </>
  )
}

export default AddOperation
