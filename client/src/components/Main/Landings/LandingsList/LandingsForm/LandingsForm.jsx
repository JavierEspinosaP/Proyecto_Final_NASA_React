import React, { Component } from "react";
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

function LandingsForm() {
  return (
    <div>
      <Form>
        <legend>Title</legend>
        <Input placeholder="Input 1" />
        <Input placeholder="Input 2" />
        <Textarea placeholder="Textarea" />
        <Button variant="raised">Submit</Button>
      </Form>
    </div>
  )
}

export default LandingsForm