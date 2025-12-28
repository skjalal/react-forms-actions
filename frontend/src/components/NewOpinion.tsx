import React, { useActionState } from "react";
import type { FormState } from "../util/data-types.ts";
import { useOpinion } from "../store/opinions-context.tsx";

const isNotEmpty = (value: string): boolean => value.trim() !== "";
const hasMinLength = (value: string): boolean => value.trim().length > 5;
const hasLengthBetween = (value: string): boolean =>
  value.trim().length < 10 || value.trim().length > 300;
const NewOpinion: React.FC = () => {
  const { addOpinion } = useOpinion();
  const shareOpinionAction = async (
    prevState: FormState,
    fd: FormData
  ): Promise<FormState> => {
    const userName: string = fd.get("userName")! as string;
    const title: string = fd.get("title")! as string;
    const body: string = fd.get("body")! as string;

    const { errors } = prevState;
    errors.splice(0, errors.length);
    if (!isNotEmpty(userName)) {
      errors.push("Please provide your name.");
    }

    if (!hasMinLength(title)) {
      errors.push("Title must be at least five characters long.");
    }
    if (hasLengthBetween(body)) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }
    await addOpinion({ title, body, userName });
    return { errors };
  };
  const initialFormState: FormState = { errors: [] };
  const [formState, formAction, pending] = useActionState<FormState, FormData>(
    shareOpinionAction,
    initialFormState
  );

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors.length > 0 && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default NewOpinion;
