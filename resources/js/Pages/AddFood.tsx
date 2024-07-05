import React from 'react'
import {Head} from "@inertiajs/react";
import Header from "@/Views/Header";
import {PageProps} from "@/types";

const AddFood = ({auth} : PageProps) => {
  return (
      <>
        <Head title="Add Foods" />

        <Header loggedInUser={auth.user} />
        <div>AddFood</div>
      </>
  )
}

export default AddFood
