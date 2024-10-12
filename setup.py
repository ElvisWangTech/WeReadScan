from setuptools import setup, find_packages

setup(
    name='WeReadScan_Editable',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    platforms=["windows", "macos", "linux"],
    # 提示前置包
    install_requires=['selenium==4.12.0', 'numpy', 'matplotlib'],
    python_requires='>=3.6'
)
