import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHttp } from "../../hooks/http.hook";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../../actions";

//// Задача для этого компонента:
//// Реализовать создание нового героя с введенными данными. Он должен попадать
//// в общее состояние и отображаться в списке + фильтроваться
//// Уникальный идентификатор персонажа можно сгенерировать через uiid
//// Усложненная задача:
//// Персонаж создается и в файле json при помощи метода POST
// TODO Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { heroes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = (body) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes", "POST", JSON.stringify(body))
      .then((data) => dispatch(heroesFetched([...heroes, data])))
      .catch(() => dispatch(heroesFetchingError()));
    if (isSubmitSuccessful) {
      resetField("name");
      resetField("description");
      resetField("element");
    }
  };

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          {...register("name", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          {...register("description", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          className="form-select"
          id="element"
          {...register("element", { required: true })}
        >
          <option value="">Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
