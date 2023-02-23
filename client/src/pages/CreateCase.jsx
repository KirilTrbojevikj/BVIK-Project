import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context'
import { CustomButton, FormField } from '../components';
import "./form.css";

const CreateCase = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createHealthCase} = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',

  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createHealthCase({...form, target: ethers.utils.parseUnits(form.target, 18)})
    navigate('/');


    console.log(form);

  }

  return (
    <div class="form-container">
      <div>
        <h1>Start donations for a health case</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <FormField
            labelName="Your Name *"
            placeholder="Ana"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Health Case Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />

        </div>

        <FormField
          labelName="Description *"
          placeholder="Write your description"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div>
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <div>
          <CustomButton
            btnType="submit"
            title="Submit"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCase