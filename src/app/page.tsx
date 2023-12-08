"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, mappedPlans } from "@/validations/userSchema";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  weight: string;
  plan: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  console.log(JSON.stringify(watch(), null, 2));

  return (
    <div className="bg-black text-white h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2"
        autoComplete="off"
      >
        <h1 className="text-orange-400 text-center font-bold font-mono text-xl">
          FORM VALIDATION - ZOD
        </h1>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Name"
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.name?.message && (
          <p className="text-red-500">{errors.name?.message}</p>
        )}
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Email"
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="Password"
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.password?.message && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}
        <input
          type="number"
          id="weight"
          {...register("weight")}
          placeholder="Weight"
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.weight?.message && (
          <p className="text-red-500">{errors.weight?.message}</p>
        )}
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          id="birthday"
          {...register("birthday")}
          className="p-1 rounded-md bg-transparent border-2 border-sky-200"
        />
        {errors.birthday?.message && (
          <p className="text-red-500">{errors.birthday?.message}</p>
        )}
        <label htmlFor="plan">Plan</label>
        <select
          id="plan"
          {...register("plan")}
          className="p-1 rounded-md bg-transparent bg-zinc-950 border-2 border-sky-200"
        >
          {plansOptions}
        </select>
        {errors.plan?.message && (
          <p className="text-red-500">{errors.plan?.message}</p>
        )}
        <button
          type="submit"
          className="bg-green-500 rounded-lg p-2 mt-2 font-bold"
        >
          SEND
        </button>
      </form>
    </div>
  );
}
