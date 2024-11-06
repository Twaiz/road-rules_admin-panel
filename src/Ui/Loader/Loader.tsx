import style from './Loader.module.scss';

type LoaderStyles = 'huge' | 'buttonLoader';

interface ILoader {
  loaderStyle?: LoaderStyles;
}

const Loader = ({ loaderStyle = 'buttonLoader' }: ILoader) => {
  const styles = {
    huge: {
      wrapper: style.wrapperHuge,
      loader: style.loader__huge,
    },
    buttonLoader: {
      wrapper: '',
      loader: style.loader,
    },
  };

  const { wrapper, loader } = styles[loaderStyle];

  return (
    <div className={wrapper}>
      <div className={loader} />
    </div>
  );
};

export default Loader;
